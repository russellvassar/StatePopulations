using Microsoft.AspNetCore.Mvc;
using StatePopulations.Models;

namespace StatePopulations.Controllers;
[ApiController]
[Route("api/[controller]")]
public class StateController : ControllerBase
{
    private readonly StatesContext _context;

    public StateController(StatesContext context)
    {
        _context = context;
    }

    [HttpGet]
    public List<StatePopulationGdp> Get(short year)
    {
        var states =
            from State in _context.States
            join StateDatum in _context.StateData on State.Abbr equals StateDatum.StateAbbr
            where State.IsState == true && StateDatum.Year == year
            select new StatePopulationGdp
            {
                GdpBillionsChained2012 = StateDatum.GdpChained2012,
                Name = State.LongName,
                Population = StateDatum.Population,
                Wkt = State.Geom.AsText(),
                Year = StateDatum.Year
            };
        return states.ToList();
    }
}
