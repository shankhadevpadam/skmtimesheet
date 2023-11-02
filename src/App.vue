<script setup>
import { reactive, ref } from "vue"
import axios from "axios"
import { useRecaptchaProvider, Checkbox } from "vue-recaptcha"
import Alert from "./components/Alert.vue"
import vueFilePond from "vue-filepond"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import "filepond/dist/filepond.min.css"

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
)

useRecaptchaProvider()

const responseToken = ref("")

const initialStateForm = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  startDate: "",
  endDate: "",
  hours: "",
  siteName: "",
  files: [],
}

const initialStateNotification = {
  message: "",
  class: "",
  show: false,
}

const formData = reactive(initialStateForm)

const notification = reactive(initialStateNotification)

const updateFiles = (fileItems) => {
  formData.files = fileItems.map((fileItem) => fileItem.file)
}

const onSubmit = async () => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL,
      {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        start_date: formData.startDate,
        end_date: formData.endDate,
        hours: formData.hours,
        site_name: formData.siteName,
        files: formData.files,
        type: "facilities_time_sheet",
        g_recaptcha_response: responseToken.value,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )

    const result = response.data

    console.log(result);

    notification.message = result.message
    notification.class = "text-green-700 bg-green-100"
    notification.show = true
  } catch (error) {
    notification.message = error.response.data.message
    notification.class = "text-red-700 bg-red-100"
    notification.show = true
  } finally {
    formData.firstName = ""
    formData.lastName = ""
    formData.email = ""
    formData.mobile = ""
    formData.startDate = ""
    formData.endDate = ""
    formData.hours = ""
    formData.siteName = ""
    formData.files = []

    document.querySelector("#app").scrollIntoView({ behavior: "smooth" })
  }
}
</script>

<template>
  <Alert
    :message="notification.message"
    :class="notification.class"
    v-show="notification.show"
    @close-alert="notification.show = status"
  />

  <div
    class="max-w-full lg:w-2/4 sm:w-1/2 mx-auto bg-white my-16 rounded shadow-md"
  >
    <h2 class="px-8 py-4 text-2xl font-semibold text-gray-600 border-b">
      Time Sheet Entry
    </h2>

    <div class="p-8">
      <form @submit.prevent="onSubmit" enctype="multipart/form-data">
        <div class="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
          <div>
            <label
              for="first-name"
              class="block text-gray-700 font-semibold mb-2"
              >First Name</label
            >
            <input
              type="text"
              v-model="formData.firstName"
              id="first-name"
              name="first-name"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label
              for="last-name"
              class="block text-gray-700 font-semibold mb-2"
              >Last Name</label
            >
            <input
              type="text"
              v-model="formData.lastName"
              id="last-name"
              name="last-name"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label for="email" class="block text-gray-700 font-semibold mb-2"
              >Email</label
            >
            <input
              type="email"
              v-model="formData.email"
              id="email"
              name="email"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label for="mobile" class="block text-gray-700 font-semibold mb-2"
              >Mobile</label
            >
            <input
              type="text"
              v-model="formData.mobile"
              id="mobile"
              name="mobile"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label
              for="start_date"
              class="block text-gray-700 font-semibold mb-2"
              >Start Date</label
            >
            <input
              type="date"
              v-model="formData.startDate"
              id="start_date"
              name="start_date"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label for="end_date" class="block text-gray-700 font-semibold mb-2"
              >End Date</label
            >
            <input
              type="date"
              v-model="formData.endDate"
              id="end_date"
              name="end_date"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label for="hours" class="block text-gray-700 font-semibold mb-2"
              >Hours</label
            >
            <input
              type="text"
              v-model="formData.hours"
              id="hours"
              name="hours"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label
              for="site_name"
              class="block text-gray-700 font-semibold mb-2"
              >Site Name</label
            >
            <input
              type="text"
              v-model="formData.siteName"
              id="site_name"
              name="site_name"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div class="lg:col-span-2 sm:col-span-1">
            <label
              for="file_upload"
              class="block text-gray-700 font-semibold mb-2"
              >Please upload invoice or supporting docs</label
            >
            <file-pond
              name="uploader"
              ref="pond"
              class-name="my-pond"
              label-idle="Drop files here..."
              allow-multiple="true"
              accepted-file-types="image/jpeg, image/png, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              max-file-size="2MB"
              :store-as-file="true"
              :files="formData.files"
              @updatefiles="updateFiles"
            />
          </div>

          <div class="lg:col-span-2 sm:col-span-1">
            <Checkbox v-model="responseToken" />
          </div>
        </div>
        <div class="flex justify-start mt-6">
          <button
            type="submit"
            class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
