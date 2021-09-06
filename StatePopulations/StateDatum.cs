using System;
using System.Collections.Generic;

#nullable disable

namespace StatePopulations
{
    public partial class StateDatum
    {
        public string StateAbbr { get; set; }
        public short Year { get; set; }
        public decimal GdpChained2012 { get; set; }
        public long Population { get; set; }

        public virtual State StateAbbrNavigation { get; set; }
    }
}
