import { Request, Response } from "express";

import FabricService from "../services/FabricService.js";
import UserService from "../services/UserService.js";
import jwt from "jsonwebtoken";

import { FabricInterface } from "../interfaces/FabricInterface.js";
import { UserInterface } from "../interfaces/UserInterface.js";

export default class FabricController {
    private fabricService = new FabricService();
    private userService = new UserService();

    private readonly SECRET_KEY = "textilera_secret";

    async getAllFabrics(req: Request, res: Response): Promise<void> {

        try {
            const fabrics = await this.fabricService.getAllFabrics();
            res.status(200).json(fabrics);
        } catch (e: unknown) {
            if (e instanceof Error) {
                res.status(500).json({
                    message: e.message
                });
            }
        }
    }

    async getFabricById(req: Request, res: Response): Promise<void> {

        try {

            const id = req.params.id as string;
            const name = req.params.name as string;

            const fabric = await this.fabricService.getFabricById(id, name);

            if (!fabric) {
                res.status(404).json({
                    message: "Tela no encontrada"
                });
                return;
            }
            res.status(200).json(fabric);
        } catch (e: unknown) {
            if (e instanceof Error) {
                res.status(500).json({
                    message: e.message
                });
            }

        }

    }

    async createFabric(req: Request, res: Response): Promise<void> {
        try {
            const fabricData: FabricInterface = req.body;
            const fabric = await this.fabricService.createFabric(fabricData);
            res.status(201).json({
                message: "Tela creada correctamente",
                data: fabric
            });
        } catch (e: unknown) {
            if (e instanceof Error) {
                res.status(500).json({
                    message: e.message
                });
            }
        }
    }

    async updateFabric(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id as string;
            const fabric = await this.fabricService.updateFabric(
                id,
                req.body
            );
            if (!fabric) {
                res.status(404).json({
                    message: "Tela no encontrada"
                });
                return;
            }
            res.status(200).json({
                message: "Registro actualizado",
                data: fabric
            });

        } catch (e: unknown) {
            if (e instanceof Error) {
                res.status(500).json({
                    message: e.message
                });
            }
        }
    }

    async deleteFabric(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id as string;
            const fabric = await this.fabricService.deleteFabric(id);
            if (!fabric) {
                res.status(404).json({
                    message: "Tela no encontrada"
                });
                return;
            }
            res.status(200).json({
                message: "Registro eliminado",
                data: fabric
            });
        } catch (e: unknown) {
            if (e instanceof Error) {
                res.status(500).json({
                    message: e.message
                });
            }
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userData: UserInterface = req.body;
            const user = await this.userService.createUser(userData);
            res.status(201).json({
                message: "Usuario creado",
                data: user
            });
        } catch (e: unknown) {
            if (e instanceof Error) {
                res.status(500).json({
                    message: e.message
                });
            }
        }
    }

    async validateUser(req: Request, res: Response): Promise<void> {
        try {
            const userData: UserInterface = req.body;
            const user = await this.userService.checkUser(userData);
            const token = jwt.sign(
                {
                    user_name: user.user_name
                },
                this.SECRET_KEY,
                {
                    expiresIn: "10m"
                }
            );
            res.status(200).json({
                message: "Inicio de sesión correcto",
                token
            });
        } catch (e: unknown) {
            if (e instanceof Error) {
                res.status(401).json({
                    message: e.message
                });
            }
        }

    }

}
