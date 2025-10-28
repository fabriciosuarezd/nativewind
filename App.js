import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import './global.css'

const App = () => {

  // Nuestros Datos
  const [tareas, setTareas] = useState([
    {id: 1, texto: 'Aprender React', completada: false},
    {id: 2, texto: 'Aprender Tailwind', completada: true},
  ])

  const [nuevaTarea, setNuevaTarea] = useState('')

  //Funcion para agregar una nueva tarea
  const agregarTarea = () => {
    
    //Si no escribimos nada sale de la funcion
    if (nuevaTarea.trim()==='') return

    const tarea = {
      id: Date.now(),
      texto: nuevaTarea,
      completada: false
    }

    setTareas([...tareas, tarea])
    setNuevaTarea('')
  }

  //Toogle cambia el valor de completado haciendo click en el checkbox 
  
  const toogleTarea = (id) => {
    setTareas(tareas.map(tarea =>
      tarea.id === id ? {...tarea, completada:!tarea.completada} : tarea
    ))
  }

  //Eliminar una tarea
  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id))
  }

  //Resumen
  const tareasCompletadas = tareas.filter(item => item.completada).length
  const totalTareas = tareas.length

  return (
    <View className='flex-1 bg-purple-50 p-6 pt-16'>
      
      {/* Header */}
      <View className='mb-8'>
        <Text className='text-4xl font-bold text-gray-800 mb-2'>
          Mis Tareas
        </Text>
        <Text className='text-lg text-gray-600'>
          {tareasCompletadas} de {totalTareas} completadas
        </Text>
      </View>

      {/* Input Nueva Tarea */}
      <View className='flex-row gap-3 mb-6'>
        <TextInput 
          className='flex-1 bg-white px-4 py-3 rounded-xl border-2 border-purple-200 text-gray-800 mr-3' 
          placeholder="Escribe una nueva tarea"
          value={nuevaTarea}
          onChangeText={setNuevaTarea}
        />
        <TouchableOpacity
          onPress={agregarTarea}
          className="bg-purple-500 px-6 py-3 rounded-xl active:bg-purple-600"
        >
          <Text className="text-white font-semibold text-2xl">+</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Tareas */}
      <ScrollView className="flex-1">
        {tareas.map((tarea)=>(
          <View
            key={tarea.id}
            className={`bg-white p-4 rounded-xl mb-3 border-2 ${tarea.completada ? 'border-green-300 bg-green-50':'border-gray-200'}`}
          >
            <View className='flex-row items-center justify-between'>
              <TouchableOpacity
                onPress={()=> toogleTarea(tarea.id)}
                className='flex-1 flex-row items-center gap-3'
              >
                <View
                  className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                    tarea.completada
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-400'
                  }`}
                >
                  {tarea.completada && (
                    <Text className="text-white text-sm font-bold"></Text>
                  )}
                </View>
                <Text
                  className={`flex-1 text-lg ${
                    tarea.completada
                      ? 'text-gray-500 line-through'
                      : 'text-gray-800'
                  }`}
                >
                  {tarea.texto}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={()=>eliminarTarea(tarea.id)}
                className='bg-red-100 px-3 py-2 rounded-lg active:border-red-200'
              >
                <Text className='text-lg'>❌</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {tareas.length === 0 && (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-400 text-xl">
              No hay tareas, crea una tarea
            </Text>
          </View>
        )}

      </ScrollView>
    </View>
  )

}

export default App


