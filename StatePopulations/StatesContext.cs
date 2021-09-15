using System;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace StatePopulations
{
    public partial class StatesContext : DbContext
    {
        public StatesContext(DbContextOptions<StatesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<StateDatum> StateData { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<State>(entity =>
            {
                entity.HasKey(e => e.Abbr)
                    .HasName("PK_state");

                entity.ToTable("State");

                entity.Property(e => e.Abbr)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .HasColumnName("abbr")
                    .IsFixedLength(true);

                entity.Property(e => e.Geom)
                    .IsRequired()
                    .HasColumnType("geometry")
                    .HasColumnName("geom");

                entity.Property(e => e.IsState).HasColumnName("isState");

                entity.Property(e => e.LongName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("longName");
            });

            modelBuilder.Entity<StateDatum>(entity =>
            {
                entity.HasKey(e => new { e.StateAbbr, e.Year });

                entity.Property(e => e.StateAbbr)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .HasColumnName("stateAbbr")
                    .IsFixedLength(true);

                entity.Property(e => e.Year).HasColumnName("year");

                entity.Property(e => e.GdpChained2012)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("gdpChained2012");

                entity.Property(e => e.Population).HasColumnName("population");

                entity.HasOne(d => d.StateAbbrNavigation)
                    .WithMany(p => p.StateData)
                    .HasForeignKey(d => d.StateAbbr)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_stateData_State");
            });
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
