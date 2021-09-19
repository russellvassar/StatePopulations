using Microsoft.AspNetCore.Mvc;
using StatePopulations.Models;
using System.Collections.Generic;
using System.Linq;

namespace StatePopulations.Controllers;
[ApiController]
public class StateController : ControllerBase
{
    private readonly StatesContext _context;

    public StateController(StatesContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("api/state")]
    public List<StatePopulationGdp> GetStates(short year)
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

    [HttpGet]
    [Route("api/years")]
    public List<short> GetYears()
    {
        var years =
            from Data in _context.StateData
            group Data by Data.Year into Years
            orderby Years.Key descending
            select Years.Key;

        return years.ToList();
    }
}
