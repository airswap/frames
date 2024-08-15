// import { createSystem } from 'frog/ui';
// import fs from 'fs';
// import path from 'path';
// import { promisify } from 'util';

// const fontPath = async (file: string) => {
//   const readFile = promisify(fs.readFile);
//   const buffer = await readFile(
//     path.join(process.cwd(), `../src/assets/fonts/${file}.otf`)
//   );
//   return { source: 'buffer', data: buffer };
// };

// const loosBlack = await fontPath('loosBlack');
// const loosBold = await fontPath('loosBold');
// const loosExtraLight = await fontPath('loosExtraLight');
// const loosMedium = await fontPath('loosMedium');
// const loosRegular = await fontPath('loosRegular');

// export async function setupSystem() {
//   const { Box } = createSystem({
//     fonts: {
//       default: [
//         {
//           name: 'Loos-Black',
//           source: loosBlack,
//           weight: 900,
//         },
//         {
//           name: 'Loos-Bold',
//           source: loosBold,
//           weight: 700,
//         },
//         {
//           name: 'Loos-ExtraLight',
//           source: loosExtraLight,
//           weight: 200,
//         },
//         {
//           name: 'Loos-Medium',
//           source: loosMedium,
//           weight: 500,
//         },
//         {
//           name: 'Loos-Regular',
//           source: loosRegular,
//           weight: 400,
//         },
//       ],
//     },
//   });
//   return { Box };
// }
