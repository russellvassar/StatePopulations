using System;
using System.Collections.Generic;

#nullable disable

namespace StatePopulations
{
    public partial class StudyShape
    {
        public int ShapeId { get; set; }
        public string Username { get; set; }
        public string Geojson { get; set; }

        public virtual User UsernameNavigation { get; set; }
    }
}
