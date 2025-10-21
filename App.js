import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, Scrollview} from 'react-native'

const App = () => {

  {/* Nuestros Datos */}
  const [tareas, setTareas] = useState([
    {id: 1, texto: 'Aprender React', completada: false},
    {id: 2, texto: 'Aprender Tailwind', completada: true},
  ])

  const [nuevaTarea, setNuevaTarea] = useState('')

  {/* Funcion para agregar una nueva tarea */}
  const agregarTarea = () => {
    
    {/* Si no escribimos nada sale de la funcion */}
    if (nuevaTarea.trim()==='') return

    const tarea = {
      id: Date.now(),
      texto: nuevaTarea,
      completada: false
    }

    setTareas([...tareas, tarea])
    setNuevaTarea('')
  }

  {/* Toogle cambia el valor de completado 
      haciendo click en el checkbox 
  */}
  const toogleTarea = (id) => {
    setTareas(tareas.map(tarea =>
      tarea.id === id ? {...tarea, completada:!tarea.completada} : tarea
    ))
  }

  {/* Eliminar una tarea */}
  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id))
  }

  {/* Resumen */}
  const tareasCompletadas = tareas.filter(item => item.completada).length
  const totalTareas = tareas.length

  return (
    <View className='flex-1 bg-purple-50 p-6 pt-16'>
      <View className='mb-8'>
        <Text className='text-4xl font-bold text-gray-800 mb-2'>
          Mis Tareas
        </Text>
        <Text className='text-lg text-gray-600'>
          {tareasCompletadas} de {totalTareas} completadas
        </Text>

        <View className='flex-row mb-6'>
          <TextInput 
            className='flex-1 bg-white px-4 py-3 rounded-xl border-2 border-purple-200 text-gray-800 mr-3' 
            placeholder="Escribe una nueva tarea"
            value={nuevaTarea}
            onChange={setNuevaTarea}
          />
        </View>
      </View>
    </View>
  )

}

export default App


