@extends('layouts.app')

@section('content')
<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 ">Nuevo Cliente</h1>

    <form action="{{ route('clientes.store') }}" method="POST">
        @csrf
        <div class="mb-4">
            <label class="block">Nombre:</label>
            <input type="text" name="nombre" class="w-full border p-2">
        </div>

        <div class="mb-4">
            <label class="block">Email:</label>
            <input type="email" name="email" class="w-full border p-2">
        </div>

        <div class="mb-4">
            <label class="block">Teléfono:</label>
            <input type="text" name="telefono" class="w-full border p-2">
        </div>

        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
    </form>
</div>
@endsection
