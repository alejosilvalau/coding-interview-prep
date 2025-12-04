class Solution {
  // O(m) time | O(m) space
  // m = total summed length of all strings in the array
  // n = number of strings in the array
  encode(strs: string[]) {
    let res: string[] = [];
    for (let s of strs) {
      res.push(s.length + '#' + s);
    }
    return res.join('');
  }

  // O(m) time | O(m + n) space
  // m = total summed length of all strings in the array
  // n = number of strings in the array
  decode(str: string) {
    let res: string[] = [];
    let i = 0;
    while (i < str.length) {
      let j = i;
      while (str[j] !== '#') {
        j++;
      }
      let length = parseInt(str.substring(i, j));
      i = j + 1;
      j = i + length;
      res.push(str.substring(i, j));
      i = j;
    }
    return res;
  }
}
