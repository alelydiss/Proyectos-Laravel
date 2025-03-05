@extends('layouts.app')

@section('content')
<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 text-white">Lista de Clientes</h1>
    <a href="{{ route('clientes.create') }}" class="bg-blue-500 text-white px-4 py-2 rounded">Añadir Cliente</a>

    <table class="w-full mt-4 border-collapse border border-gray-300">
        <thead>
            <tr class="bg-gray-100">
                <th class="border p-2">ID</th>
                <th class="border p-2">Nombre</th>
                <th class="border p-2">Email</th>
                <th class="border p-2">Teléfono</th>
                <th class="border p-2">Acciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($clientes as $cliente)
                <tr>
                    <td class="border p-2">{{ $cliente->id }}</td>
                    <td class="border p-2">{{ $cliente->nombre }}</td>
                    <td class="border p-2">{{ $cliente->email }}</td>
                    <td class="border p-2">{{ $cliente->telefono }}</td>
                    <td class="border p-2">
                        <a href="{{ route('clientes.edit', $cliente) }}" class="text-blue-500">Editar</a> |
                        <form action="{{ route('clientes.destroy', $cliente) }}" method="POST" class="inline">
                            @csrf @method('DELETE')
                            <button type="submit" class="text-red-500">Eliminar</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
