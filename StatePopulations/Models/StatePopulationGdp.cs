
namespace StatePopulations.Models;
public class StatePopulationGdp
{
    public string Name { get; set; }
    public string Wkt { get; set; }
    public short Year { get; set; }
    public decimal GdpBillionsChained2012 { get; set; }
    public long Population { get; set; }

    public StatePopulationGdp() 
    {
        Name = "";
        Wkt = "";
    }
}
