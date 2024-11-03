# What is the scope?
The scope of the design is limited to a personal account of gooogle drive, in which data can be stored. Things like:
- Docs
- Sheets
- Logs and most used docs
- Shared business accounts
- Sharing and permissions functionalities
- etc.

are out of the question. The scope is limited to the files and folders stored in google 

## Scope
- CRUD operations (Folders and Files), plus downloading files.
- Just Web, no desktop client
- 10s updates if there are multiple clients, with no conflicts between them (Two tabs accessing the same folder on a browser)
- 1B Global Users (15GB/User)
- No data loss (redundancy or duplication of the data)
- Highly Available

## CRUD Operations to be supported
- Create Folder
- Upload / Download File
- Move, Delete, Rename, Get file and folder

### Creating Entity
As we are designing Google Drive, we can use GCS (Google Cloud Storage) for the main blob storage service. For the metadata, or entity information, can be stored on a key-value store. Because these are configuration information about a particular file or entity.

When creating a file / folder, the system stores information on the K/V Store about that file / folder.

The K/V Stores needs to be HA (Highly Available) and be shared to serve that many users. 

As the entities needs to be available globaly all the time, sharding cannot be by region. Therefore, the system can be shard by the file or entity ID. But also by the owner ID.

As the K/V stores needs to be HA, we can use ETCD or ZooKeeper.

### Creating A Folder
When creating a folder, there is a need for load balancers. Since a single server cannot manage can't handle 1B users at the same time. Which is going to be based on the Owner ID. 
- The creation of a folder is managed by the Owner ID, since we want the owner of the folder be parented with the Owner of the folder.
- Let's say that the Owner is user1. Let's say that there is another user, user2, that is accessing the Google Drive of user1. Then the folder created will be still parented with user1.
- The Owner ID would be hashed

The K/V Stores could also implement Proxies for:
- Caching
- ACLs (Access Control Lists), which could do the checking if a user has permission to create a folder.

This means that creating a folder is just creating a new register on the K/V Store, with the following data structure:
```
{
  id:
  name:
  ownerId:
  childrens: []
  isFolder: true
  blobs: []
  parent: parentId
}
```
### Uploading A File

1B = 1000^3.
(15GB * 1000)^3 = (15 TB) * 1000 * 1000 = 15 PB * 1000 = 15.000 PB.
Being TB = Terabytes and PB = Petabytes.

As there is a policy of no data loss. There is duplication implemented, and probably would be stored in different availability zones.

This is because if one data center is hit by a huge disaster or an outage, there is always one data center with the data still on it.

Let's say that we need 3 sources of truth for a single piece of data, then we would need 15.000 PB * 3 = 45.000 PB ~= 50.000 PB.

There are some optimizations to be made though. Imagine if two users upload exactly the same picture twice, then the picture could be stored only once per data center.
- Also the images or the data could be split up, so that if only part of the image is the same, this doesn't gets stored twice on google drive.
- This would require smaller blob storages.

The system then may be composed by multiple API Servers and a Load Balancer.

The Job of the API servers would be to split up the file into smaller blobs of data, with an algorithm. The algorithm would determine the amount of blobs and how many of the blobs are necessary. Then they would be stored on multiple blob stores, because of the "No Data Loss" guarantee.
- Let say that are 3 blob stores with the same data at minimum.
- With async replication, even more blob stores could contain the information.

To know if we have already stored a piece of data on a given blob store, the system can compared if it already has the hash of that piece of data. Meaning if we have a piece of data, and we get the of hash it:
- If the hash is already on the blob store, then the content is already stored on the blob store
- Otherwise, it is not. And you need to store it.

With this approach, the data becomes immutable. Because if the data gets modified, then it would have a different hash, therefore it would be stored again on the blob stores.

To make the content be faster to access and de-load the blob stores, a cache layer can be implemented between the API Servers (Blob Splitters) and the Blob Stores. This layer of proxies could also compress the data. Additionally, as the blob stores are at a global level, the latency to access directly would be slow. Therefore, it is better to add this final layer of proxies.

On the blob store side, the system can have only 3 at minimum. But it would be better to have more in the background that asynchronously replicates the data to. Which would be done through an "Asynchronous Replication Controller"

The final layer of proxies would then write the data to the blob stores asynchronously. For then, the blob stores write the data to the other blob stores. Guaranteeing that the data never get lost.

The 3 Main Blob Stores needs to be picked intentionally. You can even have 2 data centers on the same data center, but on a different network or a different part of the network. Then the one that remains on a different region.
- Maybe there is not a hard requirement for the proxies to write to all of them, maybe only to two of the "Main Blob Stores"

With this system, it satisfies the "No Data Loss" policy and the High availability (HA) policy. And thanks to the caching, there is a decent latency to make CRUD operations. And this is not the most critical thing, as the users doesn't request for the lowest latencies when accessing a file on Google Drive. 

When uploading a file, the system would also create a record on the K / V Store. To keep things simple, when the file gets stored on the Main Blob Stores, then it can return a success response to the client. Which would then proceed to create a new record on the K / V Store with the following format:
```
{
  id:
  name:
  ownerId:
  childrens: []
  isFolder: false
  blobs: []
  parent: parentId
}
```
If something fails, due to "Content Addressable Storage”, the client would just re-upload the file and the file won't get written twice on the Main Blob Stores. But it would make the missing record on the K / V Store.

### Downloading A File
It would be a simple process:
1. It would go the the K / V Store
2. Get the object structure
3. Find the "blobs" array
4. Search on the pointers stored on it the blob hashes of the file that the client wants to download
5. Put the file together, "redoing" the puzzle
6. Then the client gets the file and the browser can download it.

### Move, Delete, Rename, Get A File Or Folder
These CRUD Operations would be similar

#### Rename A File or Folder
1. Go through the K / V Store
2. Edit the "name" field on the object that is stored on the K / V Store

#### Move A File Or Folder
As the structure is like a tree, with a pointer to the children and the parent. It would require to:
1. Go through the k / V Store
2. Modify the "parent" of the previous childrent object to it's new "parentId".
3. Remove the children pointer from the "childrens" array
4. Go to the new "parent", and add the new childrenId on the "childrens" array.

#### Delete A File Or Folder
As there is no trash folder functionality, then it would be:
1. Go through the k / V Store
2. Remove the parent's "Childrens" array, removing the children by it's id
3. Remove the object of the K / V Store

Due to the heavy duplication and reuse that the system is relying on, it would be difficult to actually delete the blob itself. Because other entities may be pointing to the same blob hash. This is why it would require an additionaly servers between the K / V Stores.

This service could require another database, that would keep track by counting, all the references that a given blob hash has on the K / V Store. This is essentially a "Garbage Collection System". On the given blob hash has reached to 0, then the blob stores would have an internal operation to completely delete the blob hash from the blob stores.
- These internal operations would allow the blob stores to do it on a concurrency safe manner.

#### Getting A File Or Folder
The same as the rest, just going throgh the k / V Store and retrieving back the object.

As we need to handle multiple clients, a pull every 10 seconds limit would be a simple way to solve the issue. Or there the proxies on the k / V Store could track the last modified time. And if it has changed, then the client would receive the rest of the info.

![netflix-design](./design-google-drive.png)