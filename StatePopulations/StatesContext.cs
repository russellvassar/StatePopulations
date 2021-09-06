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
        public virtual DbSet<StudyList> StudyLists { get; set; }
        public virtual DbSet<StudyShape> StudyShapes { get; set; }
        public virtual DbSet<User> Users { get; set; }

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

            modelBuilder.Entity<StudyList>(entity =>
            {
                entity.HasKey(e => e.ListId)
                    .HasName("PK_study_list");

                entity.ToTable("StudyList");

                entity.Property(e => e.ListId).HasColumnName("list_id");

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .HasColumnName("state")
                    .IsFixedLength(true);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.HasOne(d => d.StateNavigation)
                    .WithMany(p => p.StudyLists)
                    .HasForeignKey(d => d.State)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_study_list_state");

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.StudyLists)
                    .HasForeignKey(d => d.Username)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_study_list_user");
            });

            modelBuilder.Entity<StudyShape>(entity =>
            {
                entity.HasKey(e => e.ShapeId)
                    .HasName("PK_study_shape");

                entity.ToTable("StudyShape");

                entity.Property(e => e.ShapeId).HasColumnName("shape_id");

                entity.Property(e => e.Geojson)
                    .IsRequired()
                    .IsUnicode(false)
                    .HasColumnName("geojson");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.StudyShapes)
                    .HasForeignKey(d => d.Username)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_study_shape_user");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Username)
                    .HasName("PK_user");

                entity.ToTable("User");

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.Property(e => e.PassHash)
                    .IsRequired()
                    .HasMaxLength(24)
                    .IsUnicode(false)
                    .HasColumnName("pass_hash")
                    .IsFixedLength(true);

                entity.Property(e => e.PassSalt)
                    .IsRequired()
                    .HasMaxLength(24)
                    .IsUnicode(false)
                    .HasColumnName("pass_salt")
                    .IsFixedLength(true);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
