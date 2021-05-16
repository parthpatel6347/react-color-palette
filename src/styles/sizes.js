// eslint-disable-next-line import/no-anonymous-default-export
export default {
  down(size) {
    const sizes = {
      xxs: "435px",
      xs: "575.98px",
      s: "630px",
      sm: "767.98px",
      md: "991.98px",
      l: "1070px",
      lg: "1199.98px",
    };
    return `@media (max-width: ${sizes[size]})`;
  },
};
