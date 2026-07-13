import { FabricModel } from '../models/FabricModel.js'
import { FabricInterface } from '../interfaces/FabricInterface.js'

export default class FabricService{
    async getAllFabrics(): Promise<FabricInterface[]>{
        try{
            const allFabrics: FabricInterface[] = await FabricModel.find().lean();
            return allFabrics;
        } catch (e: unknown){
            if(e instanceof Error){
                console.error(e.message);
            }

            throw e;
        }
    }

    async createFabric(fabricData: FabricInterface): Promise<FabricInterface>{
        try{
            return await FabricModel.create(fabricData);
        } catch (e: unknown){
            if(e instanceof Error)
                console.error(e.message);
            throw e;
        }
    }
}
