document.addEventListener("DOMContentLoaded", function () {
  const pages = document.querySelectorAll(".page");
  let currentPage = 0;

  function scrollToPage(index) {
    if (index >= 0 && index < pages.length) {
      pages[index].scrollIntoView({ behavior: "smooth" });
      currentPage = index;
    }
  }

  document.addEventListener("wheel", function (event) {
    if (event.deltaY > 0) {
      // Scrolling down
      scrollToPage(currentPage + 1);
    } else {
      // Scrolling up
      scrollToPage(currentPage - 1);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown") {
      // Arrow down key
      scrollToPage(currentPage + 1);
    } else if (event.key === "ArrowUp") {
      // Arrow up key
      scrollToPage(currentPage - 1);
    }
  });
});
