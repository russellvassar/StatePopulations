using System;
using System.Collections.Generic;
using NetTopologySuite.Geometries;

#nullable disable

namespace StatePopulations
{
    public partial class State
    {
        public State()
        {
            StateData = new HashSet<StateDatum>();
        }

        public string Abbr { get; set; }
        public Geometry Geom { get; set; }
        public bool IsState { get; set; }
        public string LongName { get; set; }

        public virtual ICollection<StateDatum> StateData { get; set; }
    }
}
