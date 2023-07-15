import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";
import { mergeConfig } from "vite";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: [""],
      },
      resolve: {
        alias: {
          "@": resolve(__dirname, "../src"),
          "@mocks": resolve(__dirname, "../src/mocks"),
          "@components": resolve(__dirname, "../src/components"),
          "@utils": resolve(__dirname, "../src/utils"),
          "@request": resolve(__dirname, "../src/utils/request"),
          "@hooks": resolve(__dirname, "../src/hooks"),
          "@pages": resolve(__dirname, "../src/pages"),
        },
      },
    });
  },
};
export default config;
