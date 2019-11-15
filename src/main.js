import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
      links: [
        { href: "Resume.pdf", name: "Resume" },
        { href: "//github.com/haze", name: "GitHub" },
        { href: "//linkedin.com/in/hazeb", name: "LinkedIn" },
        { email: "isnt@haze.cool" },
        { href: "//discord.gg/k6TCs7c", name: "Discord" },
        // { href: "blog", name: "blog" },
      ],
	}
});

export default app;
