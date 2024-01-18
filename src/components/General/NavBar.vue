<template>
    <nav class="navbar navbar-expand-md" style="background-color: #8689ba;">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <div class="div-items">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'News' }">Noutati</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'Sponsors' }">Sponsori/Parteneri</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'Players' }">Echipa</router-link>
                        </li>
                    </div>
                    <a class="navbar-brand d-none d-md-block" href="#">
                        <router-link class="nav-link" :to="{ name: 'Homepage' }"><img src="../../assets/images/emblem.jpg"
                                alt=""></router-link>
                    </a>
                    <div class="div-items">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'ClubDetails' }">Detalii club</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'Matches' }">Meciuri</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Handball juvenil</a>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style>
.div-items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.navbar {
    border-bottom: 2px solid #4b6ad7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}

@media (max-width: 769px) {
    .navbar {
        height: auto;
    }

    .navbar-nav {
        flex-direction: column;
        text-align: center;
    }

    .div-items {
        flex-direction: column;
    }

}

@media (min-width: 769px) {
    .navbar-toggler {
        display: none;
    }

    .navbar {
        height: 100px;
    }

    .navbar-nav {
        flex-direction: row;
        text-align: center;
        display: flex;
    }

    .nav-item {
        padding-top: 20px;
        margin-inline: 2vw;
    }
}

.navbar-brand img {
    width: 120px;
    border-radius: 60px;
    border: 3px solid #4b6ad7;
    margin-top: 100px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.navbar-nav {
    align-items: center;
}

.navbar .navbar-nav .nav-link {
    color: #fff;
    font-size: 1rem;
    transition: color 0.3s ease, transform 0.3s ease;
}

.navbar .navbar-nav .nav-link:hover {
    color: #4b6ad7;
    transform: scale(1.1);
}

.navbar-brand {
    padding: 20px;
}
</style>
