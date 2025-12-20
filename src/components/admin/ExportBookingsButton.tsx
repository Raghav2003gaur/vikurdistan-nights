import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportAllBookingsToExcel, getAllStoredBookings } from "@/lib/excel-utils";
import { useToast } from "@/hooks/use-toast";

/**
 * Admin component to export all bookings to Excel
 * This can be added to an admin page or dashboard
 */
export function ExportBookingsButton() {
  const { toast } = useToast();
  const bookings = getAllStoredBookings();

  const handleExport = () => {
    try {
      if (bookings.length === 0) {
        toast({
          title: "No bookings to export",
          description: "There are no bookings stored yet.",
          variant: "destructive",
        });
        return;
      }

      exportAllBookingsToExcel();
      toast({
        title: "Export successful!",
        description: `Exported ${bookings.length} booking(s) to Excel.`,
      });
    } catch (error) {
      console.error("Error exporting bookings:", error);
      toast({
        title: "Export failed",
        description: "There was an error exporting the bookings.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleExport} variant="gold" className="gap-2">
      <Download className="w-4 h-4" />
      Export All Bookings ({bookings.length})
    </Button>
  );
}

