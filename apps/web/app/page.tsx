// import SecretManager from './components/SecretComponent';
// import Parameter from './components/Parameter';

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-2xl font-bold text-gray-900 mb-8">
//           IAM Compute Role Demo
//         </h1>
//         {/* <SecretManager /> */}
//         <Parameter />
//       </div>
//     </div>
//   );
// }

import S3Component from './components/S3Component';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[rgb(0,0,0)]">
      <h1 className="text-2xl font-bold text-white py-8 text-center relative z-10">
        Amplify Hosting Compute Role Demo
      </h1>
      <S3Component />
    </div>
  );
}