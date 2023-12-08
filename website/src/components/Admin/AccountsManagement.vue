<template>
	<div class="container my-auto mx-auto p-4">
		<h1 class="text-3xl font-semibold mb-4">Gestion des Comptes</h1>

		<div class="space-x-4 mb-4">
			<!-- Style des boutons pour changer de formulaire -->
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'create' }"
				@click="changeForm('create')"
			>
				Créer
			</button>
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'update' }"
				@click="changeForm('update')"
			>
				Modifier
			</button>
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'read' }"
				@click="changeForm('read')"
			>
				Chercher
			</button>
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'delete' }"
				@click="changeForm('delete')"
			>
				Supprimer
			</button>
		</div>

		<!-- Formulaire de création d'utilisateur -->
		<form
			v-if="activeForm === 'create'"
			class="mb-4"
			@submit.prevent="createUser"
		>
			<div class="form-group">
				<label for="createLastName" class="block">Nom *</label>
				<input
					id="createLastName"
					v-model="userData.lastname"
					required
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="createFirstName" class="block">Prénom *</label>
				<input
					id="createFirstName"
					v-model="userData.firstname"
					required
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="createMail" class="block">Mail *</label>
				<input
					id="createMail"
					v-model="userData.mail"
					required
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="createPassword" class="block">Mot de passe *</label>
				<input
					id="createPassword"
					v-model="userData.password"
					type="password"
					required
					class="input"
				/>
			</div>

			<button type="submit" class="btn-primary">Valider</button>
		</form>

		<!-- Formulaire de mise à jour d'utilisateur -->
		<form
			v-if="activeForm === 'update'"
			class="mb-4"
			@submit.prevent="updateUser"
		>
			<div class="form-group flex justify-center">
				<TextInput
					v-model="mail"
					placeholder="Chercher par mail"
					class="mb-4 w-1/2 flex justify-center"
					@input="searchUsers"
				/>
			</div>

			<div class="form-group">
				<!-- Liste des utilisateurs -->
				<UserList
					v-if="activeForm === 'update' && mail && !selectedUser"
					:user-list="filteredUsers"
					@select-user="selectUser"
				/>
			</div>

			<div class="form-group flex justify-center">
				<div
					v-if="selectedUser"
					class="form-group w-1/2 mb-4 flex justify-center"
				>
					<div class="bg-light-blue p-4 shadow rounded-lg m-2">
						<div class="mb-2">
							<strong>Mail:</strong> {{ selectedUser.mail }}
						</div>
					</div>
				</div>
			</div>

			<div class="form-group">
				<label for="updateLastName" class="block">Nom</label>
				<input
					id="updateLastName"
					v-model="userData.lastname"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="updateFirstName" class="block">Prénom</label>
				<input
					id="updateFirstName"
					v-model="userData.firstname"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="updateMail" class="block">Nouveau Mail</label>
				<input id="updateMail" v-model="userData.mail" class="input" />
			</div>

			<div class="form-group">
				<label for="updatePassword" class="block">Mot de passe</label>
				<input
					id="updatePassword"
					v-model="userData.password"
					type="password"
					class="input"
				/>
			</div>

			<button type="submit" class="btn-primary">Valider</button>
		</form>

		<!-- Formulaire de lecture d'utilisateur -->
		<form
			v-if="activeForm === 'read'"
			class="mb-4"
			@submit.prevent="searchUsers"
		>
			<!-- Barre de recherche pour le nom de famille -->
			<div class="form-group">
				<TextInput
					v-model="userData.lastname"
					placeholder="Nom"
					class="mb-4"
					@input="searchUsers"
				/>
			</div>

			<!-- Barre de recherche pour le nom de famille -->
			<div class="form-group">
				<TextInput
					v-model="userData.firstname"
					placeholder="Prénom"
					class="mb-4"
					@input="searchUsers"
				/>
			</div>

			<!-- Barre de recherche pour le mail -->
			<div class="form-group">
				<TextInput
					v-model="mail"
					placeholder="Mail"
					class="mb-4"
					@input="searchUsers"
				/>
			</div>

			<button type="submit" class="btn-primary">Chercher</button>
		</form>

		<!-- Formulaire de suppression d'utilisateur -->
		<form
			v-if="activeForm === 'delete'"
			class="mb-4"
			@submit.prevent="deleteUser"
		>
			<div class="form-group flex justify-center">
				<TextInput
					v-model="mail"
					placeholder="Chercher par mail"
					class="mb-4 w-1/2 flex justify-center"
					@input="searchUsers"
				/>
			</div>

			<div class="form-group">
				<!-- Liste des utilisateurs -->
				<UserList
					v-if="activeForm === 'delete' && mail && !selectedUser"
					:user-list="filteredUsers"
					@select-user="selectUser"
				/>
			</div>

			<div class="form-group flex justify-center">
				<div
					v-if="selectedUser"
					class="form-group w-1/2 mb-4 flex justify-center"
				>
					<div class="bg-light-blue p-4 shadow rounded-lg m-2">
						<div class="mb-2">
							<strong>Mail:</strong> {{ selectedUser.mail }}
						</div>
					</div>
				</div>
			</div>

			<button type="submit" class="btn-primary">
				Supprimer le compte
			</button>
		</form>

		<!-- Afficher les résultats des actions -->
		<div v-if="result" class="mb-4">
			<div class="result-message">
				<h2 class="text-xl font-semibold mb-2">Résultat:</h2>
				<p>{{ result }}</p>
			</div>
		</div>

		<!-- Liste des utilisateurs -->
		<UserList v-if="activeForm === 'read'" :user-list="filteredUsers" />
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user.store';
import UserList from '@/components/UserList.vue';
import TextInput from '@/components/Inputs/TextInput.vue';

// Déclarez une variable pour stocker la liste d'utilisateurs

const activeForm = ref('create');
const result = ref(null);

const userStore = useUserStore();

// Données pour les formulaires de création, mise à jour, lecture et suppression
const userData = ref({
	lastname: '',
	firstname: '',
	mail: '',
	password: '',
});

const selectedUser = ref(null);

const mail = ref(''); // Only used to look up a user in the Update and Delete parts

// Définition de la méthode pour sélectionner un user
const selectUser = (user) => {
	selectedUser.value = user;
};

// Fonctions pour changer le formulaire actif
const changeForm = (formName) => {
	activeForm.value = formName;
	result.value = '';
	userData.value.lastname = '';
	userData.value.firstname = '';
	userData.value.mail = '';
	userData.value.password = '';
};

// Fonctions pour les actions (create, update, read, delete)
const createUser = async () => {
	result.value = '';
	try {
		const response = await userStore.createUser(userData.value);
		if (response) {
			result.value = 'Compté créé'; // Message de succès ou autre traitement
		} else {
			result.value = 'Un compte utilise déjà cette adresse email'; // Message d'erreur
		}
	} catch (error) {
		result.value = 'Error creating user: ' + error.message;
	}
};

const updateUser = async () => {
	if (selectedUser.value) {
		result.value = '';
		let updateCriteria = {};
		if (userData.value.lastname) {
			updateCriteria.lastname = userData.value.lastname;
		}
		if (userData.value.firstname) {
			updateCriteria.firstname = userData.value.firstname;
		}
		if (userData.value.mail) {
			updateCriteria.mail = userData.value.mail;
		}
		if (userData.value.password) {
			updateCriteria.v = userData.value.password;
		}
		try {
			const response = await userStore.updateUser(
				selectedUser.value.userId,
				updateCriteria
			);
			if (response.data === false) {
				result.value = 'Compte non trouvé'; // Message d'erreur
			} else {
				result.value = 'Compte modifié'; // Message de succès ou autre traitement
			}
		} catch (error) {
			result.value = 'Error updating user: ' + error.message;
		}
	} else {
		result.value = 'Sélectionnez un utilisateur';
	}
};

const deleteUser = async () => {
	result.value = '';
	try {
		const response = await userStore.deleteUser(selectedUser.value.userId);
		if (response.data === 204) {
			result.value = 'Compte supprimé'; // Message de succès ou autre traitement
		} else {
			result.value = 'Compte non trouvé'; // Message d'erreur
		}
	} catch (error) {
		result.value = error.message;
	}
};

// Obtenez la liste des séances de films filtrées en fonction des critères de recherche
const filteredUsers = computed(() => {
	// Utilisez les résultats du store pour les séances de films
	return userStore.users;
});

// Fonction pour rechercher des séances de film en fonction des critères
const searchUsers = () => {
	let searchCriteria = {};
	selectedUser.value = null;
	if (userData.value.lastname) {
		searchCriteria.lastname = userData.value.lastname.toLowerCase();
	}
	if (userData.value.firstname) {
		searchCriteria.firstname = userData.value.firstname.toLowerCase();
	}
	if (mail.value) {
		searchCriteria.mail = mail.value;
	} else if (userData.value.mail) {
		searchCriteria.mail = userData.value.mail;
	}

	// Appelez la méthode de recherche du store
	userStore.searchUsers(searchCriteria);
};
</script>

<style scoped>
/* Styles spécifiques au composant */
.container {
	text-align: center;
	padding: 20px;
}

.form-group {
	margin-bottom: 20px;
}

.input {
	width: 40%;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 20px;
}

.btn-primary {
	background-color: #007bff;
	color: #fff;
	border: none;
	padding: 10px 20px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s easse;
}

.btn-primary.btn-active {
	background-color: #0056b3;
}

.result-message {
	background-color: #f2f2f2;
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 10px;
	text-align: left;
}

/* Styles pour la liste des utilisateurs (ajustez selon vos préférences) */
.user-list {
	margin-top: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 10px;
	text-align: left;
}

.user-list-item {
	margin-bottom: 10px;
}

.user-list-item:last-child {
	margin-bottom: 0;
}
</style>
