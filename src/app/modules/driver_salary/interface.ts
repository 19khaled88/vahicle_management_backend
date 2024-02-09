import { SalaryProcess } from "@prisma/client";

export const driver_salary_fields_constant = ["searchTerm",'driver_id', 'status']

type Driver = {
        id: string;
        name: string,
        email: string,
        address: string,
        avatar: string,
        experience: string,
        phone: string
}

export type IDriverSalaryResponse = {
        id: string;
        driver_id: string;
        amount: number;
        month:string;
        position:string;
        description: string | null;
        status: SalaryProcess; // Make sure `SalaryProcess` is properly imported
        driver: Driver;
        createdAt: Date;
        updatedAt: Date;


}