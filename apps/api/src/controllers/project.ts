import { Request, Response } from "express"
import generateApiKey from "../utils/apiKey";
import createProjectQuery from "../db/queries/project";

const  CreateProject = async( req: Request, res: Response) => {
    try {
        const { projectName } = req.body;

         if (!projectName || typeof projectName !== 'string' || projectName.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Project name is required and must be a valid string'
            });
        }
        const apiKey = generateApiKey(32,'hex');
        
         const createdProject = await createProjectQuery(projectName.trim(), apiKey);

        if(!createdProject){
            return res.status(500).json({
                success: false,
                message: 'Failed to create project'
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: {
                apiKey: createdProject.api_key,
                projectName: projectName.trim()
            }
        });

    } catch (error) {
        console.error('Error creating project:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while creating project'
        });
    }
}

export default CreateProject;