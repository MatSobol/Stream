var builder = WebApplication.CreateBuilder(args);

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ✅ Enable CORS middleware
app.UseCors();

string[] images = new string[]
{
    "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg"
};

var random = new Random();

app.MapGet("/images", async (int start, int count) =>
{
    if (start < 0) start = 0;
    if (count < 1) count = 1;

    await Task.Delay(0);

    string[] elements = new string[count];
    for (int i = 0; i < count; i++)
    {
        int randomIndex = random.Next(images.Length);
        elements[i] = images[randomIndex];
    }

    return Results.Ok(elements);
})
.WithOpenApi();

app.Run();
