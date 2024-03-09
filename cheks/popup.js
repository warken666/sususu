function displayBookmarks(bookmarkTreeNodes, parent) {
  var ul = document.createElement("ul");
  parent.appendChild(ul);
  bookmarkTreeNodes.forEach(function (node) {
    var li = document.createElement("li");
    li.textContent = node.title;
    ul.appendChild(li);
    if (node.children) {
      displayBookmarks(node.children, li);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
    displayBookmarks(
      bookmarkTreeNodes,
      document.getElementById("bookmarkList")
    );
  });
});
