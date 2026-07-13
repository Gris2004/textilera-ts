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

    async getFabricById(id: string, name: string): Promise<FabricInterface | null>{
        try{
            return FabricModel.findOne({
                _id: id,
                fabric_name: name
            }).lean();

        } catch (e: unknown) {
            if(e instanceof Error)
                console.error(e.message);
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

    async updateFabric(id: string, newFabric: Partial<FabricInterface>): Promise<FabricInterface | null>{
        try{
            return await FabricModel.findByIdAndUpdate(
                id,
                newFabric,
                {
                    new: true,
                    runValidaters: true
                }
            ).lean();
        } catch (e: unknown) {
            if(e instanceof Error)
                console.error(e.message);
            throw e;
        }
    }
}
