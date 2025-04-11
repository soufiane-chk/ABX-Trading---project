router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  console.log('Données reçues pour inscription:', req.body); // Ajoutez ce log

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Utilisateur déjà existant:', email);
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    const user = new User({ name, email, password });
    await user.save();
    console.log('Utilisateur créé avec succès:', user);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Erreur lors de l\'inscription:', err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});