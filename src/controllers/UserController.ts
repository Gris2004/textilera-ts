import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import UserService from "../services/UserService.js";
import { UserInterface } from "../interfaces/UserInterface.js";

export default class UserController {
    private userService = new UserService();
    private readonly SECRET_KEY = "textilera_secret";

    async createUser(req: Request, res: Response): Promise<void> {

        try {

            const userData: UserInterface = req.body;

            const user = await this.userService.createUser(userData);

            res.status(201).json({
                message: "Usuario creado correctamente",
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
