using System;
using System.Collections.Generic;

#nullable disable

namespace StatePopulations
{
    public partial class StudyList
    {
        public int ListId { get; set; }
        public string Username { get; set; }
        public string State { get; set; }

        public virtual State StateNavigation { get; set; }
        public virtual User UsernameNavigation { get; set; }
    }
}
