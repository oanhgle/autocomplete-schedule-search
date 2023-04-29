class Node {
  /**
   * Creates a Node
   * @return {Object} Node
   */
  constructor() {
    this.end = false;
    this.crn = [];
    this.children = {};
  }
}

export default class Trie {
  /**
   * Creates a Trie
   * @return {Object} Trie
   */
  constructor() {
    this.root = new Node();
  }

  /**
   * Insert a string into the Trie
   * @param {String} str String to add to the Trie
   * @param {Integer} crn CRN to add to the Trie
   * @returns {}
   */
  insert(str, crn) {
    if (str.length === 0) {
      return;
    }
    let node = this.root;

    for (const char of str) {
      if (!node.children[char]) {
        node.children[char] = new Node();
      }
      node = node.children[char];
    }

    node.end = true;
    node.crn.push(crn);
  }

  /**
   * Check whether or not a string exists within the Trie
   * @param {String} str string to search for inside Trie
   * @returns {Boolean, Node} returns [exists or not?, pointer to currentNode]
   */
  contains(str) {
    let currentNode = this.root;
    let exists = true;

    for (const letter of str) {
        console.log(currentNode.children[letter]);

        if (!(letter in currentNode.children)) {
            return [false, currentNode];
        }
        currentNode = currentNode.children[letter];
    }
    
    return [true, currentNode];
  }

  /**
   * Return a list of all words with prefix currentWord in the Trie
   * @param {String} currentWord Current word that is being accessed from Trie
   * @param {Array} courses List of all the course with the prefix currentWord in the Trie
   * @param {Object} node Reference to the current node in the trie
   * @returns {Array} List of course crn with prefix currentWord in the trie
   */
  getCourses(currentWord, courses, node) {
    if (node.end) {
        for (const course of node.crn) {
            courses.push(course);
        }
    }

    for (const letter in node.children) {
      this.getCourses(currentWord + letter, courses, node.children[letter]);
    }

    return courses;
  }

  /**
   * Obtain a list of words in the Trie that starts with the string input provided
   * @param {String} str use to match against words in Trie
   * @returns {Array} array of words which start with the input string
   */
  autoComplete(str) {
    if (str === "") 
      return -1;

    const [exists, currentNode] = this.contains(str);

    if(!exists)
      return -1;
    
    let autoCompleteWords = this.getCourses(str, [], currentNode);
    console.log(autoCompleteWords);
  
    return autoCompleteWords;
  }

  /**
   * Utility method to print out Trie in the Console
   */
  print() {
    console.log(JSON.stringify(this, null, 2));
  }
}
