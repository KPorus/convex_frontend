"use client";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";

export const Form = () => {
  const [frontendInput, setFrontendInput] = useState("");
  const [backendInput, setBackendInput] = useState("");
  const [technology, setTechnology] = useState({
    frontend: [] as string[],
    backend: [] as string[],
  });
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [serverCodeLink, setServerCodeLink] = useState("");
  const [frontendCodeLink, setFrontendCodeLink] = useState("");
  const [hostingLink, setHostingLink] = useState("");

  // Call useMutation at the top level of the component
  const createProject = useMutation(api.app.createProject);

  const handleFrontendKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const trimmedValue = frontendInput.trim();

      if (trimmedValue && !technology.frontend.includes(trimmedValue)) {
        setTechnology({
          ...technology,
          frontend: [...technology.frontend, trimmedValue],
        });
        setFrontendInput(""); // Clear the input after adding a tag
      }
    }
  };

  const handleBackendKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const trimmedValue = backendInput.trim();

      if (trimmedValue && !technology.backend.includes(trimmedValue)) {
        setTechnology({
          ...technology,
          backend: [...technology.backend, trimmedValue],
        });
        setBackendInput(""); // Clear the input after adding a tag
      }
    }
  };

  const handleRemoveFrontendTag = (tagToRemove: string) => {
    setTechnology({
      ...technology,
      frontend: technology.frontend.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleRemoveBackendTag = (tagToRemove: string) => {
    setTechnology({
      ...technology,
      backend: technology.backend.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const projectData = {
      name: projectName,
      description,
      technology,
      links: {
        serverCodeLink,
        frontendCodeLink,
        hostingLink,
      },
    };

    try {
      // Use the createProject mutation function here
      const newProjectId = await createProject(projectData);
      console.log("Submitted Project Data:", projectData);
      console.log("New Project ID:", newProjectId);
      // Optionally, handle success (e.g., clear form or show a success message)
    } catch (error) {
      console.error("Error creating project:", error);
      // Optionally, handle error (e.g., show an error message)
    }
  };

  return (
    <div id="webcrumbs">
      <div className="w-[500px] min-h-[400px] bg-neutral-50 shadow-lg rounded-lg p-6">
        <h1 className="font-title text-2xl mb-4">Create New Project</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="project-name" className="block mb-1">
              Project Name
            </label>
            <input
              type="text"
              id="project-name"
              className="w-full p-2 border rounded-md"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 border rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="technology"
              className="block mb-2 font-medium text-lg"
            >
              Technology <hr className="h-1 bg-black"></hr>
            </label>
            <ul>
              <li>
                <label htmlFor="Ftechnology" className="block mx-1">
                  Frontend Technology
                </label>
                <div className="flex flex-wrap items-center border rounded-md">
                  {technology.frontend.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-blue-200 text-blue-800 p-1 rounded mr-2 mb-2 flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1 text-blue-600"
                        onClick={() => handleRemoveFrontendTag(tag)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    id="Ftechnology"
                    className="flex-grow p-2 border-none outline-none"
                    value={frontendInput}
                    onChange={(e) => setFrontendInput(e.target.value)}
                    onKeyDown={handleFrontendKeyDown}
                    placeholder="Type and press Enter"
                  />
                </div>
              </li>
              <li>
                <label htmlFor="Btechnology" className="block mx-1">
                  Backend Technology
                </label>
                <div className="flex flex-wrap items-center border rounded-md">
                  {technology.backend.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-blue-200 text-blue-800 p-1 rounded mr-2 mb-2 flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1 text-blue-600"
                        onClick={() => handleRemoveBackendTag(tag)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    id="Btechnology"
                    className="flex-grow p-2 border-none outline-none"
                    value={backendInput}
                    onChange={(e) => setBackendInput(e.target.value)}
                    onKeyDown={handleBackendKeyDown}
                    placeholder="Type and press Enter"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div>
            <label htmlFor="links" className="block mb-2 font-medium text-lg">
              Links <hr className="h-1 bg-black"></hr>
            </label>
            <ul>
              <li>
                <label htmlFor="server-code" className="block mx-1">
                  Server Code Link
                </label>
                <input
                  type="text"
                  id="server-code"
                  className="w-full p-2 border rounded-md"
                  value={serverCodeLink}
                  onChange={(e) => setServerCodeLink(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="frontend-code" className="block mx-1">
                  Frontend Code Link
                </label>
                <input
                  type="text"
                  id="frontend-code"
                  className="w-full p-2 border rounded-md"
                  value={frontendCodeLink}
                  onChange={(e) => setFrontendCodeLink(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="hosting-link" className="block mb-1">
                  Hosting Link
                </label>
                <input
                  type="text"
                  id="hosting-link"
                  className="w-full p-2 border rounded-md"
                  value={hostingLink}
                  onChange={(e) => setHostingLink(e.target.value)}
                />
              </li>
            </ul>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#26264a] text-white rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
