import Hello from "../components/hello";

console.log("What am I doing here? -- SERVER?");
export default function Home() {
  return (
    <div>
      <h1>Welcome to LogiMax</h1>
      <p>
        LogiMax is a platform for managing logistics and supply chain
        operations.
      </p>
      <Hello />
    </div>
  );
}
