import { createSystem } from 'frog/ui';

async function loadFont(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load font: ${response.statusText}`);
  }
  return response.arrayBuffer();
}

async function loadFonts() {
  const loosBlack = await loadFont('../assets/fonts/Loos-Black.otf');
  const loosBold = await loadFont('../assets/fonts/Loos-Bold.otf');
  const loosExtraLight = await loadFont('../assets/fonts/Loos-ExtraLight.otf');
  const loosMedium = await loadFont('../assets/fonts/Loos-Medium.otf');
  const loosRegular = await loadFont('../assets/fonts/Loos-Regular.otf');

  return {
    loosBlack,
    loosBold,
    loosExtraLight,
    loosMedium,
    loosRegular,
  };
}

export async function setupSystem() {
  const fonts = await loadFonts();

  const { Box } = createSystem({
    fonts: {
      // default: [
      //   {
      //     name: 'Open Sans',
      //     source: 'google',
      //     weight: 400,
      //   },
      //   {
      //     name: 'Open Sans',
      //     source: 'google',
      //     weight: 600,
      //   },
      // ],
      default: [
        {
          name: 'Loos-Black',
          source: fonts.loosBlack,
          weight: 900,
        },
        {
          name: 'Loos-Bold',
          source: fonts.loosBold,
          weight: 700,
        },
        {
          name: 'Loos-ExtraLight',
          source: fonts.loosExtraLight,
          weight: 200,
        },
        {
          name: 'Loos-Medium',
          source: fonts.loosMedium,
          weight: 500,
        },
        {
          name: 'Loos-Regular',
          source: fonts.loosRegular,
          weight: 400,
        },
      ],
    },
  });
  return { Box };
}
