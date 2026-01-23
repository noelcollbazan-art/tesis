import { useEffect, useState } from "react";
import { gamesAPI } from "../../services/api";
import type { Game } from "../../types/game.types";

const WelcomeContent = () => {
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = await gamesAPI.getAll();
        setFeaturedGames(games);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="container mx-auto px-6 py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-block mb-4 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full">
          <span className="text-purple-300 text-sm font-medium">
            Centro VERTEX - UCI
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Videojuegos Innovadores
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
          Descubre los proyectos desarrollados por nuestro equipo en el Centro
          de Desarrollo de Videojuegos y Tecnologías Inmersivas
        </p>
      </div>

      {/* Featured Games Section */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Videojuegos Destacados
            </h2>
            <p className="text-gray-400">
              Explora nuestros proyectos más recientes y populares
            </p>
          </div>
          <button className="px-6 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg font-medium hover:bg-slate-700/50 transition-all duration-300 hover:border-purple-500/50">
            Ver Todos
          </button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGames.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400">Cargando juegos...</p>
            </div>
          ) : (
            featuredGames.map((game) => (
              <div
                key={game.id}
                className="group bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                {/* Game Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-purple-600/90 backdrop-blur-sm rounded-full text-xs font-semibold">
                    {game.category}
                  </div>
                </div>

                {/* Game Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-purple-300 group-hover:text-purple-200 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {game.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.technologies.slice(0, 2).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-800/50 border border-purple-500/20 rounded text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Details Button */}
                  <button className="w-full py-2 bg-linear-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg text-sm font-medium hover:from-purple-600/40 hover:to-pink-600/40 transition-all duration-300">
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* About VERTEX Section */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-10 md:p-16 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ¿Qué es el Centro VERTEX?
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Columna izquierda */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-purple-300">
                    Institución
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    VERTEX es el Centro de Desarrollo de Videojuegos y
                    Tecnologías Inmersivas de la Facultad de Tecnologías
                    Interactivas de la Universidad de las Ciencias Informáticas
                    (UCI).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-purple-300">
                    Misión
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Desarrollar videojuegos innovadores y soluciones de realidad
                    virtual/aumentada que impulsen la industria tecnológica
                    cubana y formen profesionales de excelencia.
                  </p>
                </div>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-purple-300">
                    Visión
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Convertirnos en el centro de referencia nacional en
                    desarrollo de videojuegos y tecnologías inmersivas,
                    reconocidos por la calidad e innovación de nuestros
                    proyectos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-purple-300">
                    Tecnologías
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Trabajamos con Unity, Unreal Engine, realidad virtual (VR),
                    realidad aumentada (AR), y las últimas tecnologías de
                    desarrollo de videojuegos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-purple-500/20">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">15+</div>
              <div className="text-gray-400 text-sm">Proyectos Activos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-gray-400 text-sm">Desarrolladores</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">8</div>
              <div className="text-gray-400 text-sm">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                100+
              </div>
              <div className="text-gray-400 text-sm">Graduados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies Section */}
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Tecnologías que Dominamos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {["Unity", "Unreal Engine", "Blender", "C#", "C++", "Python"].map(
            (tech, idx) => (
              <div
                key={idx}
                className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-lg font-semibold text-purple-300">
                  {tech}
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          ¿Quieres conocer más sobre VERTEX?
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Descubre todos nuestros proyectos, únete a nuestro equipo o colabora
          con nosotros en el desarrollo de videojuegos innovadores.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
            Ver Proyectos
          </button>
          <button className="px-8 py-4 bg-slate-800/50 border border-purple-500/30 rounded-lg font-semibold text-lg hover:bg-slate-700/50 transition-all duration-300">
            Contáctanos
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeContent;
