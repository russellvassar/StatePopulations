using System;
using System.Collections.Generic;

#nullable disable

namespace StatePopulations
{
    public partial class User
    {
        public User()
        {
            StudyLists = new HashSet<StudyList>();
            StudyShapes = new HashSet<StudyShape>();
        }

        public string Username { get; set; }
        public string PassHash { get; set; }
        public string PassSalt { get; set; }

        public virtual ICollection<StudyList> StudyLists { get; set; }
        public virtual ICollection<StudyShape> StudyShapes { get; set; }
    }
}
