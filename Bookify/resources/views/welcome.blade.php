<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Bookify - Gestión de Reservas</title>

        <!-- Fuentes y Estilos -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

        <style>
            body {
                background-color: #f8f9fa;
                font-family: 'Figtree', sans-serif;
            }
            .hero-section {
                background: url('https://source.unsplash.com/1600x900/?office,booking') no-repeat center center/cover;
                color: white;
                padding: 100px 0;
            }
            .hero-overlay {
                background: rgba(0, 0, 0, 0.5);
                padding: 50px 20px;
                border-radius: 10px;
            }
        </style>
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand fw-bold" href="#">Bookify</a>
                <div class="d-flex">
                    @if (Route::has('login'))
                        @auth
                            <a href="{{ url('/dashboard') }}" class="btn btn-primary me-2">Dashboard</a>
                        @else
                            <a href="{{ route('login') }}" class="btn btn-outline-primary me-2">Iniciar sesión</a>
                            @if (Route::has('register'))
                                <a href="{{ route('register') }}" class="btn btn-primary">Registrarse</a>
                            @endif
                        @endauth
                    @endif
                </div>
            </div>
        </nav>

        <header class="hero-section d-flex justify-content-center align-items-center text-center">
            <div class="container hero-overlay">
                <h1 class="fw-bold">Bienvenido a Bookify</h1>
                <p class="lead">Tu solución para gestionar reservas de manera eficiente y sencilla.</p>
                <a href="{{ route('register') }}" class="btn btn-lg btn-primary">Regístrate ahora</a>
            </div>
        </header>

        <section class="container text-center my-5">
            <h2 class="fw-bold">¿Qué puedes hacer con Bookify?</h2>
            <div class="row mt-4">
                <div class="col-md-4">
                    <div class="p-4 border rounded shadow-sm">
                        <h4>Gestión de Reservas</h4>
                        <p>Reserva tus servicios de forma rápida y sencilla.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="p-4 border rounded shadow-sm">
                        <h4>Panel de Administradores</h4>
                        <p>Gestiona clientes y servicios desde un solo lugar.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="p-4 border rounded shadow-sm">
                        <h4>Acceso Seguro</h4>
                        <p>Inicia sesión y accede a tu cuenta de manera segura.</p>
                    </div>
                </div>
            </div>
        </section>

        <footer class="text-center py-4 bg-light">
            <p class="mb-0">© {{ date('Y') }} Bookify. Todos los derechos reservados.</p>
        </footer>
    </body>
</html>
