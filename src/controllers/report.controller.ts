import { Request, Response } from "express";
import { generateOrderReport } from "../services/report.service";
import { OrderReportFilters } from "../types/report.types";

export async function getOrderReport(req: Request, res: Response): Promise<void> {
  try {
    const filters = req.query as OrderReportFilters;
    
    const reportResult = await generateOrderReport(filters);

    res.status(200).json({
      data: reportResult
    });

  } catch (error) {
    console.error('Error generating order report:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Internal server error while generating report';

    res.status(500).json({
      message: errorMessage,
    });
  }
}
