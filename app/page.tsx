import { Form } from "@/components/Forms/Form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {/* <form className="flex gap-3">
          <input type="text" name="pname" className="" placeholder="Enter Project Name"></input>
          <input type="text" name="pdesc" className="" placeholder="Project Decription"></input>
        </form> */}
        <Form/>
      </div>
    </main>
  );
}
