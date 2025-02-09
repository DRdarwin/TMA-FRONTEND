
import { Card } from "../../components/ui/card";

const PilotDisqualificationPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="max-w-2xl w-full p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Pilot Disqualification Page</h1>
        <p className="mb-4 text-gray-700">
          We carefully review pilot applications and adhere to strict selection standards. A candidate may be disqualified for the following reasons:
        </p>
        
        <h2 className="text-xl font-semibold mt-4">License Non-Compliance</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>The license is not recognized by EASA, FAA, or another regulator that meets our criteria.</li>
          <li>Insufficient English proficiency (below ICAO Level 4).</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-4">False or Inaccurate Information</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Errors or misleading information found in the application.</li>
          <li>Submission of fake documents or invalid licenses.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-4">Lack of Required Experience</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Insufficient flight hours for the position.</li>
          <li>Missing required ratings (IR, ME, etc.).</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-4">Medical Certificate Issues</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Lack of a valid medical certificate required for pilot duties.</li>
          <li>Medical restrictions preventing safe flight operations.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-4">Professional Reputation</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Record of serious aviation incidents, accidents, or violations.</li>
          <li>Disciplinary actions from previous employers.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-4">Visa or Work Authorization Problems</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Inability to obtain necessary documentation for legal employment in our jurisdiction.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-4">Violation of Application Conditions</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Resubmitting an application after rejection without significant qualification improvements.</li>
          <li>Failure to follow instructions or refusal to provide requested information.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-4">What to Do If You Are Disqualified?</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Inquire about the reason for disqualification by contacting us (if applicable).</li>
          <li>Improve your qualifications and reapply after (specify time frame, e.g., 6 months).</li>
          <li>Ensure that the information provided is accurate and up to date.</li>
        </ul>
        
        <p className="mt-4 text-gray-700">
          We appreciate your interest and recommend reviewing our requirements before submitting an application to maximize your chances of approval.
        </p>
      </Card>
    </div>
  );
};

export default PilotDisqualificationPage;
