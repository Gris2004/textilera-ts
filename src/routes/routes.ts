import { Router } from "express";

import FabricController from "../controllers/FabricController.js";
import UserController from "../controllers/UserController.js";

const router = Router();

const fabricController = new FabricController();
const userController = new UserController();

/*-----------------------*/
/*        TELAS          */
/*-----------------------*/

// Obtener todas las telas
router.get(
    "/fabric",
    fabricController.getAllFabrics.bind(fabricController)
);

// Obtener tela por id y nombre
router.get(
    "/fabric/:id/:name",
    fabricController.getFabricById.bind(fabricController)
);

// Crear tela
router.post(
    "/fabric",
    fabricController.createFabric.bind(fabricController)
);

// Editar tela por id
router.put(
    "/fabric/:id",
    fabricController.updateFabric.bind(fabricController)
);

// Eliminar tela por id
router.delete(
    "/fabric/:id",
    fabricController.deleteFabric.bind(fabricController)
);

/*-----------------------*/
/*      USUARIOS         */
/*-----------------------*/

// Crear usuario
router.post(
    "/user/create",
    userController.createUser.bind(userController)
);

// Validar usuario
router.post(
    "/user/login",
    userController.validateUser.bind(userController)
);

export default router;
