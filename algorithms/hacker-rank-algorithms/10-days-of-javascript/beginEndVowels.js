/**
 * Problem:
  Complete the function in the editor below by returning a RegExp object, re, that matches any string that begins and ends with the same vowel. 
  Recall that the English vowels are a, e, i, o, and u.
 */

function regexVar() {
  const re = /^[a].*[a]$|^[e].*[e]$|^[i].*[i]$|^[o].*[o]$|^[u].*[u]$/;

  return re;
}
