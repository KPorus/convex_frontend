import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new project with the given name, description, and technology stack
export const createProject = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        technology: v.object({
            frontend: v.array(v.string()),
            backend: v.array(v.string()),
        }),
        links: v.object({
            serverCodeLink: v.string(),
            frontendCodeLink: v.string(),
            hostingLink: v.string(),
        })
    },
    handler: async (ctx, args) => {
        const newProjectId = await ctx.db.insert("projects", {
            name: args.name,
            description: args.description,
            technology: {
                frontend: args.technology.frontend,
                backend: args.technology.backend,
            },
            links: {
                serverCodeLink: args.links.serverCodeLink,
                frontendCodeLink: args.links.frontendCodeLink,
                hostingLink: args.links.hostingLink,
            }
        })
        return newProjectId;
    },
});
