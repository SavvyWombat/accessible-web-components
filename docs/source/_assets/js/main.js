const inPageLinks = () => {
  const pathname = window.location.pathname === '/' ? '/' : window.location.pathname.replace(/\/$/, '');
  const pageLink = document.querySelector(`nav a[href="${pathname}"]`);
  const headings = document.querySelectorAll('main h2');

  if (headings.length > 0) {
    const template = new DOMParser().parseFromString(`<a class="in-page"/>`, 'text/html').body.firstChild;

    let previousNode = pageLink;
    headings.forEach((heading) => {
      const link = document.importNode(template);

      heading.id = heading.textContent
        .toLowerCase()
        .replace(/\W+/g, '-');

      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;

      previousNode.after(link);
      previousNode = link;
    });
  }
};

inPageLinks();