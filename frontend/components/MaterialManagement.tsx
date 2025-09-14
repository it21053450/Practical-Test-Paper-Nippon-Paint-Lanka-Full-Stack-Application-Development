'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { materialsAPI, Material, MaterialRequest } from '@/lib/api'
import toast from 'react-hot-toast'
import { Plus, Edit, Trash2, Package, Search } from 'lucide-react'

interface MaterialFormData {
  name: string
  code: string
  batch: string
}

export default function MaterialManagement() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MaterialFormData>()

  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    try {
      const response = await materialsAPI.getAll()
      setMaterials(response.data)
    } catch (error) {
      toast.error('Failed to fetch materials')
      console.error('Error fetching materials:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: MaterialFormData) => {
    try {
      if (editingMaterial) {
        await materialsAPI.update(editingMaterial.id, data)
        toast.success('Material updated successfully!')
      } else {
        await materialsAPI.create(data)
        toast.success('Material created successfully!')
      }
      
      await fetchMaterials()
      handleCloseModal() // Use our new function to handle modal closing and form reset
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed')
    }
  }

  const handleEdit = (material: Material) => {
    setEditingMaterial(material)
    reset({
      name: material.name,
      code: material.code,
      batch: material.batch,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this material?')) {
      return
    }

    try {
      await materialsAPI.delete(id)
      toast.success('Material deleted successfully!')
      await fetchMaterials()
    } catch (error) {
      toast.error('Failed to delete material')
    }
  }

  const handleAddNew = () => {
    setEditingMaterial(null)
    setIsModalOpen(true)
    // Reset form with empty values
    reset({
      name: '',
      code: '',
      batch: ''
    })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingMaterial(null)
    // Reset form with empty values when closing modal
    reset({
      name: '',
      code: '',
      batch: ''
    })
  }

  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.batch.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Materials</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage your material inventory
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="mt-4 sm:mt-0 btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Material
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search materials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Materials Table */}
      <div className="card overflow-hidden">
        {filteredMaterials.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No materials</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'No materials match your search.' : 'Get started by adding a new material.'}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <button
                  onClick={handleAddNew}
                  className="btn-primary flex items-center mx-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Material
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Batch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredMaterials.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {material.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {material.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {material.batch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {new Date(material.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(material)}
                          className="text-primary-600 hover:text-primary-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(material.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {editingMaterial ? 'Edit Material' : 'Add New Material'}
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Material Name
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="input-field mt-1"
                    placeholder="Enter material name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Material Code
                  </label>
                  <input
                    {...register('code', { required: 'Code is required' })}
                    type="text"
                    className="input-field mt-1"
                    placeholder="Enter material code"
                  />
                  {errors.code && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.code.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Material Batch
                  </label>
                  <input
                    {...register('batch', { required: 'Batch is required' })}
                    type="text"
                    className="input-field mt-1"
                    placeholder="Enter material batch"
                  />
                  {errors.batch && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.batch.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingMaterial ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
