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

import WelcomeMessage from './components/S3Component';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-16">
        Amplify Hosting Compute Role Demo
      </h1>
      <div className="w-full max-w-4xl">
        <WelcomeMessage />
      </div>
    </div>
  );
}