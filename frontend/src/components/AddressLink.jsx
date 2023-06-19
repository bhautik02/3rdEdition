export default function AddressLink({ children, className = null }) {
  if (!className) {
    className = "mt-2 block";
  }
  className += "flex gap-1 font-medium underline items-center";
  return (
    <a
      className={className}
      // target="_blank"
      href={"https://maps.google.com/?q=" + children}>
      {children}
    </a>
  );
}
