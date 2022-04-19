export const inPageLinks = () => {
  const headings = document.querySelectorAll('main h2');

  if (headings.length === 0) {
    return;
  }

  const pathname = window.location.pathname === '/' ? '/' : window.location.pathname.replace(/\/$/, '');
  const pageLink = document.querySelector(`nav a[href="${pathname}"]`);
  const inPageLinks = document.importNode(new DOMParser().parseFromString(`<div class="in-page"/>`, 'text/html').body.firstChild);
  pageLink.after(inPageLinks);
  inPageLinks.append(pageLink);

  const template = new DOMParser().parseFromString(`<a class="in-page"/>`, 'text/html').body.firstChild;

  headings.forEach((heading) => {
    const link = document.importNode(template);

    heading.id = heading.textContent
      .toLowerCase()
      .replace(/\W+/g, '-');

    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;

    inPageLinks.appendChild(link);
  });
};