import { SalaryProcess } from "@prisma/client";

export const driver_salary_fields_constant = ['driver_id', 'status',"name","email","address",]
// export const driver_salary_fields_constant = ["searchTerm",'driver_id', 'status']

type Driver ={
        id: string,
        name: string,
        email: string,
        avatar: string,
        address: string,
        phone: string,
        experience: string
}

export type IDriverSalaryResponse = {
        id: string;
        driver_id: string;
        amount: number;
        month:string;
        position:string;
        description: string | null;
        status: SalaryProcess; // Make sure `SalaryProcess` is properly imported
        
        createdAt: Date;
        updatedAt: Date;


}