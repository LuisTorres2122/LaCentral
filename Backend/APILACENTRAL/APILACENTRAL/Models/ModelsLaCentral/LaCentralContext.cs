using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class LaCentralContext : DbContext
{
    public LaCentralContext()
    {
    }

    public LaCentralContext(DbContextOptions<LaCentralContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Tblcliente> Tblclientes { get; set; }

    public virtual DbSet<Tbldetallepedido> Tbldetallepedidos { get; set; }

    public virtual DbSet<Tbldetalleservicio> Tbldetalleservicios { get; set; }

    public virtual DbSet<Tblencabezadopedido> Tblencabezadopedidos { get; set; }

    public virtual DbSet<Tblfilete> Tblfiletes { get; set; }

    public virtual DbSet<Tblmarco> Tblmarcos { get; set; }

    public virtual DbSet<Tblmaterial> Tblmaterials { get; set; }

    public virtual DbSet<Tblobra> Tblobras { get; set; }

    public virtual DbSet<Tblpassepartout> Tblpassepartouts { get; set; }

    public virtual DbSet<Tblusuario> Tblusuarios { get; set; }

    public virtual DbSet<Tblutilidade> Tblutilidades { get; set; }

    public virtual DbSet<Tblvidrio> Tblvidrios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;database=LaCentral;user=root;password=12345", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.26-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Tblcliente>(entity =>
        {
            entity.HasKey(e => e.PkIdCliente).HasName("PRIMARY");

            entity
                .ToTable("tblcliente")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.Property(e => e.PkIdCliente).HasColumnName("pk_idCliente");
            entity.Property(e => e.DireccionCliente).HasMaxLength(50);
            entity.Property(e => e.EmailCliente)
                .HasMaxLength(25)
                .HasColumnName("emailCliente");
            entity.Property(e => e.NombreCliente).HasMaxLength(50);
            entity.Property(e => e.TelefonoCliente).HasColumnName("telefonoCliente");
        });

        modelBuilder.Entity<Tbldetallepedido>(entity =>
        {
            entity.HasKey(e => new { e.PkIdDetallePedido, e.FkIdPedido })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity
                .ToTable("tbldetallepedido")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.HasIndex(e => e.FkIdPedido, "fk_idPedido");

            entity.Property(e => e.PkIdDetallePedido).HasColumnName("pk_idDetallePedido");
            entity.Property(e => e.FkIdPedido).HasColumnName("fk_idPedido");
            entity.Property(e => e.DescripcionServicio)
                .HasMaxLength(300)
                .HasColumnName("descripcionServicio");
            entity.Property(e => e.PrecioPedido)
                .HasPrecision(10, 2)
                .HasColumnName("precioPedido");

            entity.HasOne(d => d.FkIdPedidoNavigation).WithMany(p => p.Tbldetallepedidos)
                .HasForeignKey(d => d.FkIdPedido)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("tbldetallepedido_ibfk_1");
        });

        modelBuilder.Entity<Tbldetalleservicio>(entity =>
        {
            entity.HasKey(e => new { e.FkIdDetallePedido, e.Linea })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity
                .ToTable("tbldetalleservicio")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.HasIndex(e => e.FkIdMaterial, "fk_idMaterial");

            entity.Property(e => e.FkIdDetallePedido).HasColumnName("fk_idDetallePedido");
            entity.Property(e => e.Linea).HasColumnName("linea");
            entity.Property(e => e.ColorMaterial)
                .HasMaxLength(50)
                .HasColumnName("colorMaterial");
            entity.Property(e => e.FkIdMaterial).HasColumnName("fk_idMaterial");
            entity.Property(e => e.NombreMaterial).HasMaxLength(100);
            entity.Property(e => e.PrecioMaterial)
                .HasPrecision(10, 2)
                .HasColumnName("precioMaterial");

            entity.HasOne(d => d.FkIdMaterialNavigation).WithMany(p => p.Tbldetalleservicios)
                .HasForeignKey(d => d.FkIdMaterial)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("tbldetalleservicio_ibfk_2");
        });

        modelBuilder.Entity<Tblencabezadopedido>(entity =>
        {
            entity.HasKey(e => e.PkIdPedido).HasName("PRIMARY");

            entity
                .ToTable("tblencabezadopedido")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.HasIndex(e => e.FkIdCliente, "fk_idCliente");

            entity.Property(e => e.PkIdPedido)
                .ValueGeneratedNever()
                .HasColumnName("pk_idPedido");
            entity.Property(e => e.AbonoPedido)
                .HasPrecision(10, 2)
                .HasColumnName("abonoPedido");
            entity.Property(e => e.DescuentoPedido)
                .HasPrecision(10, 2)
                .HasColumnName("descuentoPedido");
            entity.Property(e => e.EstatusPedido).HasColumnName("estatusPedido");
            entity.Property(e => e.FechaPedido).HasColumnName("fechaPedido");
            entity.Property(e => e.FkIdCliente).HasColumnName("fk_idCliente");
            entity.Property(e => e.NombreCliente)
                .HasMaxLength(50)
                .HasColumnName("nombreCliente");
            entity.Property(e => e.TotalPedido)
                .HasPrecision(10, 2)
                .HasColumnName("totalPedido");

            entity.HasOne(d => d.FkIdClienteNavigation).WithMany(p => p.Tblencabezadopedidos)
                .HasForeignKey(d => d.FkIdCliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("tblencabezadopedido_ibfk_1");
        });

        modelBuilder.Entity<Tblfilete>(entity =>
        {
            entity.HasKey(e => e.PkIdFilete).HasName("PRIMARY");

            entity
                .ToTable("tblfilete")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.HasIndex(e => e.FKIdMaterial, "fK_idMaterial");

            entity.Property(e => e.PkIdFilete).HasColumnName("pk_idFilete");
            entity.Property(e => e.FKIdMaterial).HasColumnName("fK_idMaterial");
            entity.Property(e => e.PrecioFilete)
                .HasPrecision(10, 2)
                .HasColumnName("precioFilete");
            entity.Property(e => e.TipoFilete)
                .HasMaxLength(15)
                .HasColumnName("tipoFilete");

            entity.HasOne(d => d.FKIdMaterialNavigation).WithMany(p => p.Tblfiletes)
                .HasForeignKey(d => d.FKIdMaterial)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("tblfilete_ibfk_1");
        });

        modelBuilder.Entity<Tblmarco>(entity =>
        {
            entity.HasKey(e => e.PkIdMarco).HasName("PRIMARY");

            entity
                .ToTable("tblmarco")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.HasIndex(e => e.FKIdMaterial, "fK_idMaterial");

            entity.Property(e => e.PkIdMarco).HasColumnName("pk_idMarco");
            entity.Property(e => e.CodigoMarco)
                .HasMaxLength(50)
                .HasColumnName("codigoMarco");
            entity.Property(e => e.FKIdMaterial).HasColumnName("fK_idMaterial");
            entity.Property(e => e.PrecioMarco)
                .HasPrecision(10, 2)
                .HasColumnName("precioMarco");

            entity.HasOne(d => d.FKIdMaterialNavigation).WithMany(p => p.Tblmarcos)
                .HasForeignKey(d => d.FKIdMaterial)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("tblmarco_ibfk_1");
        });

        modelBuilder.Entity<Tblmaterial>(entity =>
        {
            entity.HasKey(e => e.PkIdMaterial).HasName("PRIMARY");

            entity
                .ToTable("tblmaterial")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.Property(e => e.PkIdMaterial).HasColumnName("pk_idMaterial");
            entity.Property(e => e.NombreMaterial).HasMaxLength(25);
        });

        modelBuilder.Entity<Tblobra>(entity =>
        {
            entity.HasKey(e => e.PkIdObra).HasName("PRIMARY");

            entity
                .ToTable("tblobra")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.Property(e => e.PkIdObra).HasColumnName("pk_idObra");
            entity.Property(e => e.AutorObra)
                .HasMaxLength(25)
                .HasColumnName("autorObra");
            entity.Property(e => e.FechaPublicacionObra).HasColumnName("fechaPublicacionObra");
            entity.Property(e => e.ImportanciaObra).HasColumnName("importanciaObra");
            entity.Property(e => e.MedidaObra)
                .HasMaxLength(15)
                .HasColumnName("medidaObra");
            entity.Property(e => e.PosicionObra).HasColumnName("posicionObra");
            entity.Property(e => e.PrecioObra)
                .HasPrecision(10, 2)
                .HasColumnName("precioObra");
            entity.Property(e => e.TecnicaObra)
                .HasMaxLength(50)
                .HasColumnName("tecnicaObra");
            entity.Property(e => e.TituloObra)
                .HasMaxLength(50)
                .HasColumnName("tituloObra");
            entity.Property(e => e.UrlObra).HasColumnName("urlObra");
        });

        modelBuilder.Entity<Tblpassepartout>(entity =>
        {
            entity.HasKey(e => e.PkIdPassepartout).HasName("PRIMARY");

            entity
                .ToTable("tblpassepartout")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.HasIndex(e => e.FKIdMaterial, "fK_idMaterial");

            entity.Property(e => e.PkIdPassepartout).HasColumnName("pk_idPassepartout");
            entity.Property(e => e.CodigoPassepartout)
                .HasMaxLength(50)
                .HasColumnName("codigoPassepartout");
            entity.Property(e => e.ColorPassepartout)
                .HasMaxLength(30)
                .HasColumnName("colorPassepartout");
            entity.Property(e => e.FKIdMaterial).HasColumnName("fK_idMaterial");

            entity.HasOne(d => d.FKIdMaterialNavigation).WithMany(p => p.Tblpassepartouts)
                .HasForeignKey(d => d.FKIdMaterial)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("tblpassepartout_ibfk_1");
        });

        modelBuilder.Entity<Tblusuario>(entity =>
        {
            entity.HasKey(e => e.PkIdUsuario).HasName("PRIMARY");

            entity
                .ToTable("tblusuario")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.Property(e => e.PkIdUsuario).HasColumnName("pk_idUsuario");
            entity.Property(e => e.EmailUsuario)
                .HasMaxLength(25)
                .HasColumnName("emailUsuario");
            entity.Property(e => e.PasswordUsuario)
                .HasMaxLength(255)
                .HasColumnName("passwordUsuario");
        });

        modelBuilder.Entity<Tblutilidade>(entity =>
        {
            entity.HasKey(e => e.PkUtilidad).HasName("PRIMARY");

            entity
                .ToTable("tblutilidades")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.Property(e => e.PkUtilidad).HasColumnName("pk_utilidad");
            entity.Property(e => e.NombreUtilidad)
                .HasMaxLength(25)
                .HasColumnName("nombreUtilidad");
            entity.Property(e => e.ValorUtilidad)
                .HasPrecision(10, 2)
                .HasColumnName("valorUtilidad");
        });

        modelBuilder.Entity<Tblvidrio>(entity =>
        {
            entity.HasKey(e => e.PkIdVidrio).HasName("PRIMARY");

            entity
                .ToTable("tblvidrio")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.HasIndex(e => e.FKIdMaterial, "fK_idMaterial");

            entity.Property(e => e.PkIdVidrio).HasColumnName("pk_idVidrio");
            entity.Property(e => e.FKIdMaterial).HasColumnName("fK_idMaterial");
            entity.Property(e => e.PrecioVidrio)
                .HasPrecision(10, 2)
                .HasColumnName("precioVidrio");
            entity.Property(e => e.TipoVidrio)
                .HasMaxLength(15)
                .HasColumnName("tipoVidrio");

            entity.HasOne(d => d.FKIdMaterialNavigation).WithMany(p => p.Tblvidrios)
                .HasForeignKey(d => d.FKIdMaterial)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("tblvidrio_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
